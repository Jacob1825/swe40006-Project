const allowedStatuses = ['Open', 'In Progress', 'Resolved'];

function isValidStatus(status) {
    return allowedStatuses.includes(status);
}

module.exports = {
    isValidStatus
};