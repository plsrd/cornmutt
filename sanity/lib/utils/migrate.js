import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'krm54zrd',
  dataset: 'development',
  apiVersion: '2023-12-08',
});

const migrate = async () => {
  const data = await client.fetch(`*[_type == 'exercise'][10]`);

  console.log(data);
};

migrate();
