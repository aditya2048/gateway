const { multerUpload } = require("../utils/multerUtils");

async function numberOfFilesLimitUser(req, res, next) {
  let contentTypeStr = req.headers["content-type"].split("; ");
  let strArr = contentTypeStr[1];
  let boundary = strArr.slice(0, 9);
  let delimeter = strArr.slice(9, strArr.length);
  let headBufferString = req._readableState.buffer.head.data.toString("utf-8");
  let tailBufferString = req._readableState.buffer.tail.data.toString("utf-8");
  let headBufferArray = headBufferString.split(delimeter);
  let tailBufferArray = tailBufferString.split(delimeter);
  let numOfF = 0;
  if (
    boundary === "boundary=" &&
    headBufferArray.length === tailBufferArray.length
  ) {
    numOfF = tailBufferArray.length - 2;
    const newLimits = { ...req.limits };
    const numberOfFiles = numOfF;
    const delLimits = { ...req.deltaLimits };

    if (numberOfFiles > req.limits.files_remaining)
      return res.status(429).json("File limit exceeded");
    else {
      newLimits.files_remaining -= numberOfFiles;
      req.limits = newLimits;
      delLimits.no_of_files = numberOfFiles;
      req.deltaLimits = delLimits;
      return next();
    }
  }
  res.status(500).json("Internal Error occured on updating file limits");
}

async function fileSizeLimitUser(req, res, next) {
  const newLimits = { ...req.limits };
  const delLimits = { ...req.deltaLimits };
  let totalFilzeSize = req.headers["content-length"] || 0;
  // req.files.forEach((file) => {
  //   totalFilzeSize += file.size;
  // });
  if (totalFilzeSize > newLimits.files_size_remaining)
    return res.status(429).json("File Size limit exceeded");
  else {
    newLimits.files_size_remaining -= totalFilzeSize;
    req.limits = newLimits;
    delLimits.file_size = Number(totalFilzeSize);
    req.deltaLimits = delLimits;
    return next();
  }
}

function setupFileSizelimit(app, routes) {
  routes.forEach((r) => {
    if (r.fileSizeAndNoLimited) {
      app.use(
        r.url,
        [
          // multerUpload,
          numberOfFilesLimitUser,
          fileSizeLimitUser,
        ],
        function (req, res, next) {
          return next();
        }
      );
    }
  });
}

module.exports = setupFileSizelimit;
