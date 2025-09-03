const authConfig = {
    providers: [
        {
            domain: "https://clerk.mentisy.com",
            //domain: process.env.NEXT_PUBLIC_CLERK_JWT_ISSUER || "https://living-ostrich-19.clerk.accounts.dev",
            //domain: "https://living-ostrich-19.clerk.accounts.dev",
            applicationID: "convex",
        },
         
    ]
};

export default authConfig;