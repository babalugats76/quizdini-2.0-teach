const AWS = require('aws-sdk');
const keys = require('../config/keys');
const {
  sendRecoveryEmail,
  sendRegisterEmail,
  sendResetEmail
} = require('../services/email');

const awsConfig = {
  region: keys.awsRegion,
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretAccessKey,
  logger: console.log
};

module.exports = app => {
  app.post('/testRegisterEmail', async (req, res, next) => {
    try {
      const { toEmail, firstName, fullName, verifyUrl } = req.body;
      const email = await sendRegisterEmail({
        toEmail,
        firstName,
        fullName,
        verifyUrl
      });
      res.send({ email });
    } catch (e) {
      next(e);
    }
  });

  app.post('/testRecoveryEmail', async (req, res, next) => {
    try {
      const { toEmail, firstName, fullName, username, loginUrl } = req.body;
      const email = await sendRecoveryEmail({
        toEmail,
        firstName,
        fullName,
        username,
        loginUrl
      });
      res.send({ email });
    } catch (e) {
      next(e);
    }
  });

  app.post('/testResetEmail', async (req, res, next) => {
    try {
      const {
        toEmail,
        firstName,
        fullName,
        resetUrl,
        resetExpiryDate
      } = req.body;
      const email = await sendResetEmail({
        toEmail,
        firstName,
        fullName,
        resetUrl,
        resetExpiryDate
      });
      res.send({ email });
    } catch (e) {
      next(e);
    }
  });

  /* Use as a way to create email templates without the command-line API */
  app.get('/createTemplates', async (req, res, next) => {
    try {
      const config = new AWS.Config({ ...awsConfig, apiVersion: '2010-12-01' });
      const ses = new AWS.SES(config);

      let data, params, templateParams;

      /** BEGIN REGISTER EMAIL TEMPLATE */

      params = { TemplateName: 'QUIZDINI_REGISTER' };

      try {
        await ses.deleteTemplate(params).promise();
      } catch (e) {
        console.log(e);
      }

      templateParams = {
        Template: {
          TemplateName: 'QUIZDINI_REGISTER',
          SubjectPart: 'Completing Your Registration',
          HtmlPart:
          '<!DOCTYPE html> \
           <html lang="en"> \
             <head> \
               <style type="text/css"> \
                 @media screen { \
                   @font-face { \
                     font-family: "Lato"; \
                     font-style: normal; \
                     font-weight: 400; \
                     src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXg.woff2) format("woff2"); \
                     unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                   } \
                   @font-face { \
                    font-family: "Montserrat"; \
                    font-style: normal; \
                    font-weight: 700; \
                    src: local("Montserrat Bold"), local("Montserrat-Bold"), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format("woff2"); \
                    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                   } \
                 } \
                 body { background-color: #e8e8e8; font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif; height: 100%; margin: 0; padding: 0; } \
                 table { font-size: 16px; } \
                 #bodyTable { border-collapse: collapse; } \
                 #emailContainer { background-color: #ffffff; border:1px #dceaf5 solid; border-collapse: collapse; border-radius: 4px; max-width: 600px; } \
                 #emailHeader { background-color: #1a1c57; } \
                 #logo { vertical-align: middle; } \
                 #emailBody { color: #3e3e3e; } \
                 #title { color: #343434; font-family: "Montserrat", Verdana, sans-serif; font-size: 1.5em; font-weight: 700; margin-bottom: 1.5em; margin-top: 0; } \
                 #greeting, #message { line-height: 1.3em; } \
                 #message p { padding-bottom: 5px; } \
                 #emailFooter { background-color: #2e3235; color: #aaaaaa; line-height: 1.5em; min-height: 125px; } \
                 #emailFooter a { color: #cccccc; } \
                 .link { text-decoration: underline; } \
               </style> \
             </head> \
             <body> \
               <table id="bodyTable" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> \
                 <tr> \
                   <td align="center" valign="top"> \
                     <table id="emailContainer" cellpadding="0" cellspacing="0" width="100%"> \
                       <tr> \
                         <td valign="middle"> \
                           <table id="emailHeader" align="center" border="0" cellpadding="0" cellspacing="16" width="100%"> \
                             <tr align="center"> \
                               <td align="center" valign="middle"> \
                                 <img id="logo" src="https://static.quizdini.com/img/quizdini-badge-logo-100x100.png" alt="Quizdini Logo" title="Quizdini Logo" /> \
                               </td> \
                             </tr> \
                           </table> \
                         </td> \
                       </tr> \
                       <tr> \
                         <td valign="top"> \
                           <table id="emailBody" align="center" border="0" cellpadding="16" cellspacing="16" width="100%"> \
                             <tr align="center"> \
                               <td valign="top"> \
                                 <p id="title">Welcome to Quizdini!</p> \
                                 <p id="greeting">Dear {{firstName}},</p> \
                                 <div id="message"> \
                                   <p>Your Quizdini account has been created.</p> \
                                   <p>Just one more step and you will be creating fun activities for your students.</p> \
                                   <p>Please click the following link to verify your account (or copy and paste into your browser): <br/><a class="link" href="{{verifyUrl}}" target="_blank" title="Verify Your Account">{{verifyUrl}}</a></p> \
                                   <p>Thank you for using Quizdini!</p> \
                                   <p>--The Quizdini Team--</p> \
                                 </div> \
                               </td> \
                             </tr> \
                           </table> \
                         </td> \
                       </tr> \
                       <tr> \
                         <td valign="center"> \
                           <table id="emailFooter" align="center" border="0" cellpadding="0" cellspacing="8" width="100%"> \
                             <tr align="center"> \
                               <td align="center" valign="top"> \
                                 <p id="footer-links"><a class="link" href="mailto:support@quizdini.com?subject=I%20Need%20Help!" target="_blank" title="Email Quizdini">Email</a> &bull; <a class="link" href="https://twitter.com/quizdini" target="_blank" title="Quizdini on Twitter">Twitter</a> &bull; <a class="link" href="https://www.youtube.com/channel/UCWyG9yOngwM0w5CHBnvMZEA" target="_blank" title="Quizdini YouTube Channel">YouTube Channel</a></p> \
                                 <p id="copyright">Quizdini &copy; 2013-2019</p> \
                               </td> \
                             </tr> \
                           </table> \
                         </td> \
                       </tr> \
                     </table> \
                   </td> \
                 </tr> \
               </table> \
             </body> \
           </html>',
          TextPart:
          'Dear {{firstName}},\r\n Welcome to Quizdini!\r\nYour account has been created.\r\nJust one more step and you will be creating fun activities for your students.\r\nPlease copy and paste the following link into your browser to verify your account: {{verifyUrl}}\r\nThank you for using Quizdini!\r\n--The Quizdini Team--'
        }
      };

      data = await ses.createTemplate(templateParams).promise();
      console.log(data);

      /** BEGIN RECOVER USERNAME TEMPLATE */
      params = { TemplateName: 'QUIZDINI_RECOVER_USERNAME' };

      try {
        await ses.deleteTemplate(params).promise();
      } catch (e) {
        console.log(e);
      }

      templateParams = {
        Template: {
          TemplateName: 'QUIZDINI_RECOVER_USERNAME',
          SubjectPart: 'Username Recovery',
          HtmlPart:
            '<!DOCTYPE html> \
             <html lang="en"> \
               <head> \
                 <style type="text/css"> \
                   @media screen { \
                     @font-face { \
                       font-family: "Lato"; \
                       font-style: normal; \
                       font-weight: 400; \
                       src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXg.woff2) format("woff2"); \
                       unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                     } \
                     @font-face { \
                      font-family: "Montserrat"; \
                      font-style: normal; \
                      font-weight: 700; \
                      src: local("Montserrat Bold"), local("Montserrat-Bold"), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format("woff2"); \
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                     } \
                   } \
                   body { background-color: #e8e8e8; font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif; height: 100%; margin: 0; padding: 0; } \
                   table { font-size: 16px; } \
                   #bodyTable { border-collapse: collapse; } \
                   #emailContainer { background-color: #ffffff; border:1px #dceaf5 solid; border-collapse: collapse; border-radius: 4px; max-width: 600px; } \
                   #emailHeader { background-color: #1a1c57; } \
                   #logo { vertical-align: middle; } \
                   #emailBody { color: #3e3e3e; } \
                   #title { color: #343434; font-family: "Montserrat", Verdana, sans-serif; font-size: 1.5em; font-weight: 700; margin-bottom: 1.5em; margin-top: 0; } \
                   #greeting, #message { line-height: 1.3em; } \
                   #message p { padding-bottom: 5px; } \
                   #emailFooter { background-color: #2e3235; color: #aaaaaa; line-height: 1.5em; min-height: 125px; } \
                   #emailFooter a { color: #cccccc; } \
                   .link { text-decoration: underline; } \
                 </style> \
               </head> \
               <body> \
                 <table id="bodyTable" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> \
                   <tr> \
                     <td align="center" valign="top"> \
                       <table id="emailContainer" cellpadding="0" cellspacing="0" width="100%"> \
                         <tr> \
                           <td valign="middle"> \
                             <table id="emailHeader" align="center" border="0" cellpadding="0" cellspacing="16" width="100%"> \
                               <tr align="center"> \
                                 <td align="center" valign="middle"> \
                                   <img id="logo" src="https://static.quizdini.com/img/quizdini-badge-logo-100x100.png" alt="Quizdini Logo" title="Quizdini Logo" /> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                         <tr> \
                           <td valign="top"> \
                             <table id="emailBody" align="center" border="0" cellpadding="16" cellspacing="16" width="100%"> \
                               <tr align="center"> \
                                 <td valign="top"> \
                                   <p id="title">Username Recovery</p> \
                                   <p id="greeting">Dear {{firstName}},</p> \
                                   <div id="message"> \
                                     <p>A request has been made to recover your username.</p> \
                                     <p>The username associated with your account is <strong>{{username}}</strong>.</p> \
                                     <p>Please click the following link to log in to your account (or copy and paste into your browser): <br/><a class="link" href="{{loginUrl}}" target="_blank" title="Log in to your Account">{{loginUrl}}</a></p> \
                                     <p>Thank you for using Quizdini!</p> \
                                     <p>--The Quizdini Team--</p> \
                                   </div> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                         <tr> \
                           <td valign="center"> \
                             <table id="emailFooter" align="center" border="0" cellpadding="0" cellspacing="8" width="100%"> \
                               <tr align="center"> \
                                 <td align="center" valign="top"> \
                                   <p id="footer-links"><a class="link" href="mailto:support@quizdini.com?subject=I%20Need%20Help!" target="_blank" title="Email Quizdini">Email</a> &bull; <a class="link" href="https://twitter.com/quizdini" target="_blank" title="Quizdini on Twitter">Twitter</a> &bull; <a class="link" href="https://www.youtube.com/channel/UCWyG9yOngwM0w5CHBnvMZEA" target="_blank" title="Quizdini YouTube Channel">YouTube Channel</a></p> \
                                   <p id="copyright">Quizdini &copy; 2013-2019</p> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                       </table> \
                     </td> \
                   </tr> \
                 </table> \
               </body> \
             </html>',
          TextPart:
            'Dear {{firstName}},\r\nA request has been made to recover your username.\r\nPlease copy and paste the following link into your browser to log in to your account: {{loginUrl}}\r\nThank you for using Quizdini!\r\n--The Quizdini Team--'
        }
      };

      data = await ses.createTemplate(templateParams).promise();
      console.log(data);

      /** BEGIN RESET PASSWORD TEMPLATE */
      params = { TemplateName: 'QUIZDINI_RESET_PASSWORD' };

      try {
        await ses.deleteTemplate(params).promise();
      } catch (e) {
        console.log(e);
      }

      templateParams = {
        Template: {
          TemplateName: 'QUIZDINI_RESET_PASSWORD',
          SubjectPart: 'Password Reset Request',
          HtmlPart:
            '<!DOCTYPE html> \
             <html lang="en"> \
               <head> \
                 <style type="text/css"> \
                   @media screen { \
                     @font-face { \
                       font-family: "Lato"; \
                       font-style: normal; \
                       font-weight: 400; \
                       src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXg.woff2) format("woff2"); \
                       unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                     } \
                     @font-face { \
                      font-family: "Montserrat"; \
                      font-style: normal; \
                      font-weight: 700; \
                      src: local("Montserrat Bold"), local("Montserrat-Bold"), url(https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format("woff2"); \
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; \
                     } \
                   } \
                   body { background-color: #e8e8e8; font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif; height: 100%; margin: 0; padding: 0; } \
                   table { font-size: 16px; } \
                   #bodyTable { border-collapse: collapse; } \
                   #emailContainer { background-color: #ffffff; border:1px #dceaf5 solid; border-collapse: collapse; border-radius: 4px; max-width: 600px; } \
                   #emailHeader { background-color: #1a1c57; } \
                   #logo { vertical-align: middle; } \
                   #emailBody { color: #3e3e3e; } \
                   #title { color: #343434; font-family: "Montserrat", Verdana, sans-serif; font-size: 1.5em; font-weight: 700; margin-bottom: 1.5em; margin-top: 0; } \
                   #greeting, #message { line-height: 1.3em; } \
                   #message p { padding-bottom: 5px; } \
                   #emailFooter { background-color: #2e3235; color: #aaaaaa; line-height: 1.5em; min-height: 125px; } \
                   #emailFooter a { color: #cccccc; } \
                   .link { text-decoration: underline; } \
                 </style> \
               </head> \
               <body> \
                 <table id="bodyTable" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"> \
                   <tr> \
                     <td align="center" valign="top"> \
                       <table id="emailContainer" cellpadding="0" cellspacing="0" width="100%"> \
                         <tr> \
                           <td valign="middle"> \
                             <table id="emailHeader" align="center" border="0" cellpadding="0" cellspacing="16" width="100%"> \
                               <tr align="center"> \
                                 <td align="center" valign="middle"> \
                                   <img id="logo" src="https://static.quizdini.com/img/quizdini-badge-logo-100x100.png" alt="Quizdini Logo" title="Quizdini Logo" /> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                         <tr> \
                           <td valign="top"> \
                             <table id="emailBody" align="center" border="0" cellpadding="16" cellspacing="16" width="100%"> \
                               <tr align="center"> \
                                 <td valign="top"> \
                                   <p id="title">Password Reset Instructions</h3> \
                                   <p id="greeting">Dear {{firstName}},</p> \
                                   <div id="message"> \
                                     <p>A request has been made to reset your password.</p> \
                                     <p>Please click the following link to complete your password reset (or copy and paste into your browser): <br/><a class="link" href="{{resetUrl}}" target="_blank" title="Reset Your Password">{{resetUrl}}</a></p> \
                                     <p>This link will expire <strong>{{resetExpiryDate}}</strong>.</p> \
                                     <p>Thank you for using Quizdini!</p> \
                                     <p>--The Quizdini Team--</p> \
                                   </div> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                         <tr> \
                           <td valign="center"> \
                             <table id="emailFooter" align="center" border="0" cellpadding="0" cellspacing="8" width="100%"> \
                               <tr align="center"> \
                                 <td align="center" valign="top"> \
                                   <p id="footer-links"><a class="link" href="mailto:support@quizdini.com?subject=I%20Need%20Help!" target="_blank" title="Email Quizdini">Email</a> &bull; <a class="link" href="https://twitter.com/quizdini" target="_blank" title="Quizdini on Twitter">Twitter</a> &bull; <a class="link" href="https://www.youtube.com/channel/UCWyG9yOngwM0w5CHBnvMZEA" target="_blank" title="Quizdini YouTube Channel">YouTube Channel</a></p> \
                                   <p id="copyright">Quizdini &copy; 2013-2019</p> \
                                 </td> \
                               </tr> \
                             </table> \
                           </td> \
                         </tr> \
                       </table> \
                     </td> \
                   </tr> \
                 </table> \
               </body> \
             </html>',
          TextPart:
            'Dear {{firstName}},\r\nA request has been made to reset your password.\r\nPlease copy and paste the following link into your browser to complete your password reset: {{resetUrl}}\r\nThis link will expire {{resetExpiryDate}}.\r\nThank you for using Quizdini!\r\n--The Quizdini Team--'
        }
      };

      data = await ses.createTemplate(templateParams).promise();
      console.log(data);

      res.send('Done creating templates...');
    } catch (e) {
      console.log(e);
    }
  });
};
