exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.sellerBoard = (req, res) => {
  res.status(200).send("Seller Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.buyerBoard = (req, res) => {
  res.status(200).send("Buyer Content.");
};
