import mongoose from 'mongoose';

const getLogs = async (page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);

  const skip = (page - 1) * limit;

  const collection = mongoose.connection.db.collection('logs');
  const logs = await collection.find({})
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalLogs = await collection.countDocuments();
  const totalPage = Math.ceil(totalLogs / limit);

  return { logs, total_pages: totalPage, total_logs: totalLogs };
};

const deleteOldLogs = async () => {
  const retentionPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days
  const cutoffDate = new Date(Date.now() - retentionPeriod);

  const collection = mongoose.connection.db.collection('logs');
  const result = await collection.deleteMany({ timestamp: { $lt: cutoffDate } });

  console.log(`Old logs deleted successfully. Deleted ${result.deletedCount} logs.`);
};

export { getLogs, deleteOldLogs };