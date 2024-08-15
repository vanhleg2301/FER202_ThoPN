import emailjs from "emailjs-com";

export const sendActivationEmail = (email, activeCode) => {
  const templateParams = {
    from_name: "System",
    to_name: email,
    activeCode: `http://localhost:3000/auth/active-code/${activeCode}`,
    reply_to: email,
  };

  emailjs
    .send(
      "service_4bgjfpd", // https://dashboard.emailjs.com/admin
      "template_psp2g57", // https://dashboard.emailjs.com/admin/templates
      templateParams,
      "aon1s73paRv5nok0U" // https://dashboard.emailjs.com/admin/account
    )
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
};
