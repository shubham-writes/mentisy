export const clerkAppearance = {
  variables: {
    colorPrimary: "#FF75A0",
    colorTextOnPrimaryBackground: "white",
    borderRadius: "0.5rem",
  },
  elements: {
    formFooter: "text-center text-sm text-gray-600 dark:text-gray-400",
  },
  layout: {
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
    showTerms: true,
  },
  localization: {
    footerText:
      "By signing up, you agree to our {{termsLink}} and {{privacyPolicyLink}}",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
  },
};
