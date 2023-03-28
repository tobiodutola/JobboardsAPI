

const userLogOut = (req, res) => {
    // No action needed on server-side, client-side should delete token
    res.json({ message: 'Logout successful' });
  }

  module.exports = userLogOut;