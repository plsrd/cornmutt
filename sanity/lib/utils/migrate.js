import { createClient } from 'next-sanity';
import cq from 'concurrent-queue';

const queue = cq()
  .limit({concurrency: 10})
  .process(function (task) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve.bind(undefined, task), 1000);
    });
  });

const fitClient = createClient({
  projectId: 'krm54zrd',
  dataset: 'development',
  apiVersion: '2023-12-08',
});

const client = createClient({
  projectId: 'k8p6uw8a',
  dataset: 'cornmutt-dev',
  apiVersion: '2023-12-08',
  token: "sks0chW7UBlz55z8kKa5iQ9keOYq1wXvhZHiM9TZHZv6iQrBh2k6MhHxfcCPU7XCjMGoXEujZutG4hnk6"
})

const migrate = async () => {
  const docs = await fitClient.fetch(`*[_type == 'exercise']`);

  for (const doc of docs) {
    queue(doc).then(doc =>{

      delete Object.assign(doc, {demoImage: doc['demo'] })['demo']
      console.log(doc);
      client.createOrReplace(doc).then((res) => {
        console.log(res);
      });
    });
  }
  
};

migrate();
