
const usersModel = require('../users/users-model');
function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  console.log(
    {
      method: req.method,
      url: req.url,
      timestamp: Date.now()
    }
  )
  next();
}

function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  usersModel.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(404).json({ message: "not found" })
      }
    })
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  if (req.body.name) {
    next();
  } else {
    return res
      .status(400)
      .json({ message: "gerekli name alanı eksik" })
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  if (req.body.text) {
    next();
  } else {
    return res
      .status(400)
      .json({ message: "gerekli text alanı eksik " });
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}