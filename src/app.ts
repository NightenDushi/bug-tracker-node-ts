import express from 'express';
const app = express();
var cors = require('cors');
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.get('/', (req, res) => {
  res.send('Hello World! :)');
});
app.get('/tickets', (req, res) => {
  res.send(
    //Dummy data
    JSON.stringify([
      {
          "id": 1,
          "isDone": false,
          "isDraft": false,
          "urgency": 0,
          "title": "Bad performance when reloading",
          "body": "This is another test",
          "tags": [
              {
                  "id": 0,
                  "text": "foo",
                  "color": "primary"
              }
          ],
          "person_assigned": [
              1
          ],
          "comments": []
      },
      {
          "id": 0,
          "isDone": false,
          "isDraft": false,
          "urgency": 1,
          "title": "Bug on the front page",
          "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque turpis at diam mattis vehicula. Aenean nec eros in lorem condimentum sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed orci eget ligula accumsan fringilla. Aliquam ultrices convallis gravida. Nulla facilisi. Integer leo arcu, volutpat ac enim at, fermentum pulvinar eros.",
          "tags": [
              {
                  "id": 0,
                  "text": "foo",
                  "color": "primary"
              },
              {
                  "id": 1,
                  "text": "bar",
                  "color": "warning"
              }
          ],
          "person_assigned": [
              0
          ],
          "comments": [],
          "dueDate": "2023-11-01T00:00:00.000Z"
      },
      {
          "id": 4,
          "isDone": false,
          "isDraft": true,
          "urgency": 0,
          "title": "Next feature",
          "body": "I will publish this later",
          "tags": [
              {
                  "id": 1,
                  "text": "bar",
                  "color": "warning"
              }
          ],
          "person_assigned": [
              0
          ],
          "comments": []
      },
      {
          "id": 2,
          "isDone": true,
          "isDraft": false,
          "urgency": 0,
          "title": "Test not passing",
          "body": "This was a test",
          "tags": [
              {
                  "id": 0,
                  "text": "foo",
                  "color": "primary"
              },
              {
                  "id": 1,
                  "text": "bar",
                  "color": "warning"
              }
          ],
          "person_assigned": [
              0
          ],
          "comments": []
      },
      {
          "id": 3,
          "isDone": false,
          "isDraft": false,
          "urgency": 2,
          "title": "UI qwirks",
          "body": "This is a test",
          "tags": [
              {
                  "id": 0,
                  "text": "foo",
                  "color": "primary"
              },
              {
                  "id": 1,
                  "text": "bar",
                  "color": "warning"
              }
          ],
          "person_assigned": [
              2
          ],
          "comments": []
      }
  ])
  );
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});