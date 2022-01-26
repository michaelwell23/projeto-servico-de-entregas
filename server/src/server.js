import app from './app';

app.listen(process.env.PORT, function () {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
