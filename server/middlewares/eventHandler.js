module.exports = (req, res, next) => {
  console.log('inside event');
  console.log(req.event);
  if (req.event) {
    console.log('Handle Me...I am an event');
    console.log(req.event);
    res.send(req.event);
  }
  next();
};