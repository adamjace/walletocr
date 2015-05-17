module.exports = function (app) {

  // 401 
  app.use(function (req, res, next) {
    
    res.status(401);

    if (req.accepts('json')) {
      return res.json({ error: 'bad authentication' });
    }

    // default response type
    res.type('txt');
    res.send("401 Bad authentication");
  });

  // 404s
  app.use(function (req, res, next) {
    
    res.status(404);

    if (req.accepts('json')) {
      return res.json({ error: 'Not found' });
    }

    // default response type
    res.type('txt');
    res.send("404 Not Found");
  });

   // 500
  app.use(function (err, req, res, next) {
    console.error('error at %s\n', req.url, err.stack);
    res.send(500, "Oops, 500 Server Error");
  });
 
};
