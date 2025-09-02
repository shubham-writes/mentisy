const authConfig = {
    providers: [
        {
            // domain: "https://clerk.mentisy.com",
            domain: process.env.CLERK_ISSUER_URL!,
            applicationID: "convex",
        },
         
    ]
};

export default authConfig;
