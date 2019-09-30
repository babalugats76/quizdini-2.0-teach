const AWS = require('aws-sdk');
const keys = require('../config/keys');

const awsConfig = {
  region: keys.awsRegion,
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  logger: console.log
};

/***
 * Send recover username email, including username and link to login page
 * Email is relayed using Amazon AWS' SES service via template
 *
 * @param {object} email Information about the email to be sent.
 * @param {string} email.toAddress Email address of the recipient.
 * @param {string} email.firstName Receipient's first name.
 * @param {string} email.fullName Receipient's full name.
 * @param {string} email.username Username (local) for user.
 * @param {string} email.loginUrl Fully-qualified URL of login page.
 * @returns Promise Caller must handle fulfillment, rejection, etc.
 */
const sendRecoveryEmail = async function({
  toAddress,
  firstName,
  fullName,
  username,
  loginUrl
}) {
  const config = new AWS.Config({ ...awsConfig, apiVersion: '2010-12-01' });
  const ses = new AWS.SES(config);

  // BccAddresses: ["Quizdini <support@quizdini.com>"],
  // CcAddresses: ["james@colestock.com"],

  const recipient = `${fullName} <${toAddress}>`;

  const emailParams = {
    Destination: {
      ToAddresses: [recipient]
    },
    Template: 'QUIZDINI_RECOVER_USERNAME',
    TemplateData: `{
        \"firstName\": \"${firstName}\",
        \"fullName\": \"${fullName}\",
        \"username\": \"${username}\",
        \"loginUrl\": \"${loginUrl}\"
      }`,
    Source: 'Quizdini <support@quizdini.com>',
    ReplyToAddresses: ['noreply@quizdini.com']
  };
  return await ses.sendTemplatedEmail(emailParams).promise();
};

/***
 * Send register email, including verify link
 * Email is relayed using Amazon AWS' SES service via template
 *
 * @param {object} email Information about the email to be sent.
 * @param {string} email.toAddress Email address of the recipient.
 * @param {string} email.firstName Receipient's first name.
 * @param {string} email.fullName Receipient's full name.
 * @param {string} email.verifyUrl Fully-qualified URL of link to verify recipient email.
 * @returns Promise Caller must handle fulfillment, rejection, etc.
 */
const sendRegisterEmail = async function({
  toAddress,
  firstName,
  fullName,
  verifyUrl
}) {
  const config = new AWS.Config({ ...awsConfig, apiVersion: '2010-12-01' });
  const ses = new AWS.SES(config);

  // BccAddresses: ["Quizdini <support@quizdini.com>"],
  // CcAddresses: ["james@colestock.com"],

  const recipient = `${fullName} <${toAddress}>`;

  const emailParams = {
    Destination: {
      ToAddresses: [recipient]
    },
    Template: 'QUIZDINI_REGISTER',
    TemplateData: `{
        \"firstName\": \"${firstName}\",
        \"fullName\": \"${fullName}\",
        \"verifyUrl\": \"${verifyUrl}\"
      }`,
    Source: 'Quizdini <support@quizdini.com>',
    ReplyToAddresses: ['noreply@quizdini.com']
  };
  return await ses.sendTemplatedEmail(emailParams).promise();
};

/***
 * Send password reset email, including reset link
 * Email is relayed using Amazon AWS' SES service via template
 *
 * @param {object} email Information about the email to be sent.
 * @param {string} email.toAddress Email address of the recipient.
 * @param {string} email.firstName Receipient's first name.
 * @param {string} email.fullName Receipient's full name.
 * @param {string} email.resetUrl Fully-qualified URL of link user can use to reset password.
 * @param {string} email.resetExpiryDate Formatted date/time when provided resetUrl expires.
 * @returns Promise Caller must handle fulfillment, rejection, etc.
 */
const sendResetEmail = async function({
  toAddress,
  firstName,
  fullName,
  resetUrl,
  resetExpiryDate
}) {
  const config = new AWS.Config({ ...awsConfig, apiVersion: '2010-12-01' });
  const ses = new AWS.SES(config);

  // BccAddresses: ["Quizdini <support@quizdini.com>"],
  // CcAddresses: ["james@colestock.com"],

  const recipient = `${fullName} <${toAddress}>`;

  const emailParams = {
    Destination: {
      ToAddresses: [recipient]
    },
    Template: 'QUIZDINI_RESET_PASSWORD',
    TemplateData: `{
        \"firstName\": \"${firstName}\",
        \"fullName\": \"${fullName}\",
        \"resetUrl\": \"${resetUrl}\",
        \"resetExpiryDate\": \"${resetExpiryDate}\"
      }`,
    Source: 'Quizdini <support@quizdini.com>',
    ReplyToAddresses: ['noreply@quizdini.com']
  };
  return await ses.sendTemplatedEmail(emailParams).promise();
};

module.exports = {
  sendRecoveryEmail,
  sendRegisterEmail,
  sendResetEmail
};
