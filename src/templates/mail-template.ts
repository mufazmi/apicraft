import Constants from "../utils/constants";

class MailTemplate {
  getMailData(data: any) {
    switch (data.type) {
      case "welcome":
        return {
          subject: `Welcome to ${Constants.COMPANY_NAME}`,
          body: this.generateWelcomeEmail(data.name),
        };
      case "email_verification":
        return {
          subject: `Verify your email address | ${Constants.COMPANY_NAME}`,
          body: this.generateVerificationEmail(data.name, data.code),
        };
      case "forgotPassword":
        return {
          subject: `Forgot Password | ${Constants.COMPANY_NAME}`,
          body: this.generateForgotEmail(data.name, data.code),
        };
      case "resetPassword":
        return {
          subject: `Password Reset Successful | ${Constants.COMPANY_NAME}`,
          body: this.generateResetEmail(data.name),
        };
      case "inviteUser":
        return {
          subject: `Invitation to join | ${Constants.COMPANY_NAME}`,
          body: this.generateInvitationEmail(data.name, data.author, data.org, data.designation, data.role, data.link),
        };
      default:
        return {
          subject: `${Constants.COMPANY_NAME}`,
          body: `${Constants.COMPANY_NAME}`,
        };
    }
  }

  private generateResetEmail(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Password Reset Successful</title>
        <style>
          /* Global Styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          
          /* Header Styles */
          .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            font-size: 28px;
            color:#ffffff;
          }
  
          /* Content Styles */
          .content {
            padding: 20px;
          }
  
          /* Button Styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Successful</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Your password has been successfully reset for your ${Constants.COMPANY_NAME} account.</p>
            <p>If you didn't request this password reset or have any concerns, please contact us immediately at ${Constants.COMPANY_EMAIL}.</p>
          </div>
          <div class="footer">
            &copy; 2023 ${Constants.COMPANY_NAME}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  }
  

  private generateForgotEmail(name: string, code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Forgot Password</title>
        <style>
          /* Global Styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          
          /* Header Styles */
          .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            font-size: 28px;
            color:#ffffff;
          }
  
          /* Content Styles */
          .content {
            padding: 20px;
          }
  
          /* Button Styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Forgot Password</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>We received a request to reset your password for your ${Constants.COMPANY_NAME} account.</p>
            <p>If you did not make this request, you can ignore this email. No changes will be made to your account.</p>
            <p>To reset your password, please use the following verification code:</p>
            <p style="text-align: center; font-size: 24px; font-weight: bold;">${code}</p>
            <p>If you need further assistance, please contact our support team.</p>
          </div>
          <div class="footer">
            &copy; 2023 ${Constants.COMPANY_NAME}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  }
  

  private generateWelcomeEmail(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to ${Constants.COMPANY_NAME}</title>
        <style>
          /* Global Styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          
          /* Header Styles */
          .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            font-size: 28px;
            color:#ffffff;
          }

          /* Content Styles */
          .content {
            padding: 20px;
          }

          /* Button Styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ${Constants.COMPANY_NAME}</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Welcome to ${Constants.COMPANY_NAME}! We are excited to have you on board.</p>
            <p>You're just one click away from accessing our amazing services. Click the button below to get started:</p>
            <a class="button" href="[WelcomeLink]">Get Started</a>
          </div>
          <div class="footer">
            &copy; 2023 ${Constants.COMPANY_NAME}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateVerificationEmail(name: string, code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Verify your email address</title>
        <style>
          /* Global Styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          
          /* Header Styles */
          .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            font-size: 28px;
            color:#ffffff;
          }

          /* Content Styles */
          .content {
            padding: 20px;
          }

          /* Button Styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify your email address</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Welcome to ${Constants.COMPANY_NAME}. You're just one click away from getting started with us.</p>
            <p>Please verify your email address by entering the following code into the app:</p>
            <p style="text-align: center; font-size: 24px; font-weight: bold;">${code}</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            &copy; 2023 ${Constants.COMPANY_NAME}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateInvitationEmail(name: string, author: string, org: string, designation: string, role: string, link: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invitation to join</title>
        <style>
          /* Global Styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          
          /* Header Styles */
          .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            font-size: 28px;
            color:#ffffff;
          }

          /* Content Styles */
          .content {
            padding: 20px;
          }

          /* Button Styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 10px 0;
            border-radius: 0 0 10px 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Invitation to join</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>You have been invited by ${author} to join their organization ${org} as a ${designation} (${role}).</p>
            <p>To accept the invitation and access ${Constants.COMPANY_NAME}, click on the link below:</p>
            <a class="button" href="${link}">Accept Invitation</a>
            <p>If you didn't expect this invitation, please contact the ${Constants.COMPANY_NAME} team.</p>
          </div>
          <div class="footer">
            &copy; 2023 ${Constants.COMPANY_NAME}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default new MailTemplate();
