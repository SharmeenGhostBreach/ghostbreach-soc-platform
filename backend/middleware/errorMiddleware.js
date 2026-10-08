// 404 handler for unknown API routes
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

// Central error handler: always responds with JSON and never leaks stack traces.
export const errorHandler = (err, req, res, next) => {
  // Malformed JSON body sent by a client
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;
  if (statusCode >= 500) console.error(err); // details stay in the server terminal

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Server error' : err.message,
  });
};
