import emailjs from "@emailjs/browser";

export const sendEmail = async (formData, templateId) => {
  debugger;
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      templateId,
      formData,
      import.meta.env.VITE_PUBLIC_KEY
    );
    return response;
  } catch (error) {
    throw error;
  }
};
