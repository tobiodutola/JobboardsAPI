/*const requireAuth = (req, res, next) => {
    if (req.user) {
      // User is authenticated
      if (req.user.role === 'admin') {
        // Admin user can perform any action
        next();
      } else {
        // Non-admin user can only perform read actions
        res.status(401).json({ message: 'You are not authorized to perform this action' });
      }
    } else {
      // User is not authenticated
      res.status(401).json({ message: 'You must be logged in to perform this action' });
    }
  }

  model.exports = requireAuth*/