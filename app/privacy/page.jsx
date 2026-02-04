import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-background rounded-lg shadow-sm border">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy for PrompterPro</h1>
                    <p className="mb-4 text-muted-foreground uppercase tracking-wider text-sm font-semibold">
                        Effective Date: February 04, 2026
                    </p>
                    <p className="mb-4">
                        PrompterPro operates the website{" "}
                        <Link href="https://prompterpro.com" className="text-primary underline">
                            https://prompterpro.com
                        </Link>{" "}
                        and the PrompterPro Chrome Extension ("Extension"). This Privacy Policy comprehensively explains how we collect, use, store, handle, and share all user data when you use the Extension and related services.
                    </p>
                    <p className="mb-6 font-semibold">
                        If you do not agree with this Privacy Policy, do not use the Extension or our services.
                    </p>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Data Collection and Usage</h2>
                        <p className="mb-4">We collect information to provide a better experience for all of our users. This section details what we collect and how it is used.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Extension Permissions and Data Collection</h3>
                        <p className="mb-2">The PrompterPro Chrome Extension requires specific permissions to function correctly on the ChatGPT website:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>activeTab:</strong> Used to interact with the active ChatGPT tab. This allows us to inject UI elements, read the prompt you type in the textarea, and modify it with an optimized version.</li>
                            <li><strong>Cookies:</strong> Used for authentication and Single Sign-On (SSO). We read authentication tokens from <code>promptrpro.com</code> and set them on <code>chatgpt.com</code> to verify your login status and maintain your session across both domains.</li>
                            <li><strong>Host Permissions:</strong> We require access to <code>https://chatgpt.com/*</code> and <code>https://prompterpro.com/*</code> to inject the necessary scripts and communicate with our backend APIs for prompt optimization and account management.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Information You Provide</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Email address:</strong> Collected during account registration; used for authentication, account recovery, and service-related communications via <strong>Resend</strong>.</li>
                            <li><strong>User Prompts:</strong> When you use the "Optimize" feature, the text you enter into the ChatGPT input box is sent to our servers and processed by <strong>Groq</strong> to provide an improved version. This data is used solely for the purpose of providing the service.</li>
                            <li><strong>Payment Information:</strong> Subscription payments are handled entirely by <strong>Stripe</strong>. We do not store your credit card details on our servers.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Authentication Tokens:</strong> Managed by <strong>Supabase</strong> to keep you logged in securely.</li>
                            <li><strong>Log Data:</strong> Includes IP address, browser type, and usage patterns; used for security, debugging, and service improvement.</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Data Handling and Storage</h2>
                        <p className="mb-4">We take the security of your data seriously and implement industry-standard measures to protect it.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Storage Providers</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Supabase, Inc.:</strong> We use Supabase for user authentication and our primary database. Your account information and subscription status are stored securely on their infrastructure.</li>
                            <li><strong>Local Storage:</strong> Non-sensitive user preferences and extension state data are stored locally in your browser to personalize your experience.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Security Measures</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS/SSL protocols. Data at rest in our databases is also encrypted.</li>
                            <li><strong>Access Control:</strong> Access to user data is strictly limited to authorized personnel who need it to maintain the service.</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Third-Party Sharing</h2>
                        <p className="mb-4">We do not sell your personal data. We share information with third parties only as necessary to provide our services:</p>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                                <p className="font-bold">Supabase, Inc.</p>
                                <p className="text-sm">Provides authentication and database services. They handle user login and account data storage.</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                                <p className="font-bold">Groq, Inc.</p>
                                <p className="text-sm">Provides the AI infrastructure used to optimize your prompts. Prompts are sent to Groq for processing during optimization.</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                                <p className="font-bold">Resend, Inc.</p>
                                <p className="text-sm">Used for sending transactional emails, such as account verification and receipt notifications.</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                                <p className="font-bold">Stripe, Inc.</p>
                                <p className="text-sm">Processes all payments and manages subscriptions. They handle all sensitive financial data.</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                                <p className="font-bold">Google LLC</p>
                                <p className="text-sm">We provide the option to sign in using Google OAuth, which shares your email and basic profile info with us.</p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Your Rights and Data Retention</h2>
                        <p className="mb-4">You have the right to access, correct, or delete your personal data. You can exercise these rights by contacting us at <strong>prompterai.co@gmail.com</strong>.</p>
                        <p className="mb-4">We retain your data for as long as your account is active or as needed to provide you services and comply with our legal obligations.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
                        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <p className="font-bold text-xl">PrompterPro</p>
                            <p>📍 1 Library Avenue, Millbrae, California</p>
                            <p>📧 prompterai.co@gmail.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
