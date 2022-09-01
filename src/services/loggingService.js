const db = require("../../db");
const { Logging } = db;

async function createLogging(logObject) {
  try {
    const logging = await Logging.create(logObject);
    return logging;
  } catch (err) {
    console.log("ERROR", err);
    return;
  }
}

async function updateLogging(request_id, logUpdateObject) {
  try {
    const updated = await Logging.update(logUpdateObject, {
      where: { id: request_id },
    });
    return updated;
  } catch (err) {
    console.log("ERROR", err);
    return [0];
  }
}

module.exports = { createLogging, updateLogging };
