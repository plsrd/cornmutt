export const setAuthorInitialValue = async (
  value,
  { currentUser, getClient }
) => {
  const client = getClient({ apiVersion: '2023-12-11' });
  const _id = await client.fetch('*[_type == "author" && _id == $id][0]._id', {
    id: currentUser.id,
  });

  if (!_id) {
    const doc = {
      _id: currentUser.id,
      _type: 'author',
      name: currentUser.name,
    };

    const newDoc = await fetch(currentUser.profileImage, {
      'Access-Control-Allow-Origin': '*',
    })
      .then(res => res.blob())
      .then(blob => client.assets.upload('image', blob))
      .then(asset =>
        client.createOrReplace({
          ...doc,
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
      )
      .catch(e => console.log(e.message));

    return {
      _type: 'reference',
      _ref: newDoc._id,
    };
  }

  return {
    _type: 'reference',
    _ref: _id,
  };
};
