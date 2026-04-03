// Wraps any async route function and catches errors automatically
// No more try/catch in every single route
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler