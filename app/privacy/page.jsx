import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-background rounded-lg shadow-sm border">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy for PrompterPro Chrome Extension</h1>
                    <p className="mb-4 text-muted-foreground uppercase tracking-wider text-sm font-semibold">
                        Effective Date: Mon Jan 12 2026
                    </p>
                    <p className="mb-4">
                        PromptrPro we operate the website{" "}
                        <Link href="https://prompterpro.com" className="text-primary underline">
                            https://prompterpro.com
                        </Link>{" "}
                        and the PromptrPro (“Extension”). This Privacy Policy explains how we collect, use, store, and share information when you use the Extension and related services.
                    </p>
                    <p className="mb-6 font-semibold">
                        If you do not agree with this Privacy Policy, do not use the Extension or our services.
                    </p>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Information Collected by the Chrome Extension</h2>
                        <h3 className="text-xl font-medium mb-2 font-bold">Information the Extension Collects</h3>
                        <p className="mb-2">The PrompterPro Chrome Extension collects and processes the following limited information:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>User authentication status (logged in or logged out)</li>
                            <li>User preferences and extension settings (stored locally in the browser)</li>
                            <li>Extension usage events required for core functionality</li>
                        </ul>
                        <p className="mb-4 italic text-sm">This information is used solely to operate the Extension as intended.</p>
                        
                        <h3 className="text-xl font-medium mb-2 font-bold text-red-600 dark:text-red-400">Information the Extension Does Not Collect</h3>
                        <p className="mb-2">The Extension does not collect, access, or store:</p>
                        <ul className="list-disc pl-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <li>Browsing history</li>
                            <li>Website content</li>
                            <li>Keystrokes</li>
                            <li>Personal messages</li>
                            <li>Credit card or payment details</li>
                            <li>Cookies from unrelated websites</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Local Storage and Data Handling</h2>
                        <p className="mb-4">The Extension stores user preferences and state locally in the browser using standard browser localStorage.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>No data stored by the Extension is shared with third parties.</li>
                            <li>Local data can be removed at any time by uninstalling the Extension or clearing browser storage.</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Website and Account Information</h2>
                        <p className="mb-4">When you use the PrompterPro website (<Link href="https://prompterpro.com" className="text-primary underline">https://prompterpro.com</Link>), we may collect:</p>
                        
                        <h3 className="text-xl font-medium mb-2 font-bold">Personal Information</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Email address (for account creation, login, and support)</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Payment Information</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Payments are processed securely by Stripe</li>
                            <li>We do not store credit card or payment details</li>
                            <li>Stripe processes payment data in accordance with its own privacy policy</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Automatically Collected Information (Website Only)</h2>
                        <p className="mb-2">When using the website, we may automatically collect:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Device information</li>
                            <li>Pages visited and usage data</li>
                        </ul>
                        <p className="text-sm italic">This information is used to operate, maintain, and improve our services.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. How We Use Information</h2>
                        <p className="mb-2">We use collected information to:</p>
                        <ul className="list-disc pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <li>Provide and maintain the Extension and website</li>
                            <li>Authenticate users</li>
                            <li>Process payments</li>
                            <li>Communicate with users</li>
                            <li>Improve functionality and performance</li>
                            <li>Prevent fraud and abuse</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
                        <p className="mb-4">We do not sell personal information.</p>
                        <p className="mb-2">We may share information only with:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Stripe, for payment processing</li>
                            <li>Legal authorities, if required by law</li>
                            <li>Business successors, in the event of a merger or acquisition</li>
                        </ul>
                        <p className="font-bold">No Extension data is shared with advertisers or data brokers.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
                        <p className="mb-2">Cookies may be used on the website to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Maintain login sessions</li>
                            <li>Improve user experience</li>
                            <li>Analyze traffic patterns</li>
                        </ul>
                        <p className="mb-4">You can disable cookies through your browser settings.</p>
                        <p className="italic">The Chrome Extension itself does not use third-party tracking cookies.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. California Privacy Rights (CCPA / CPRA)</h2>
                        <p className="mb-4">California residents have the right to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Know what personal information we collect</li>
                            <li>Request deletion of personal information</li>
                            <li>Correct inaccurate personal information</li>
                            <li>Opt out of the sale or sharing of personal data (we do not sell data)</li>
                            <li>Receive equal service regardless of exercising privacy rights</li>
                        </ul>
                        <h3 className="text-xl font-medium mb-2 font-bold">How to Exercise Your Rights</h3>
                        <p className="mb-4">Contact us at:</p>
                        <p className="font-medium text-lg">📧 prompterai.co@gmail.com</p>
                        <p className="mt-4 text-sm">We will verify your request and respond within the timeframe required by law.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
                        <p className="mb-2">We retain personal information only as long as necessary to:</p>
                        <ul className="list-disc pl-6">
                            <li>Provide our services</li>
                            <li>Comply with legal obligations</li>
                            <li>Resolve disputes and enforce agreements</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Data Security</h2>
                        <p className="mb-4">
                            We use reasonable administrative, technical, and physical safeguards to protect user information. No method of transmission or storage is completely secure.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Children’s Privacy</h2>
                        <p className="mb-4">
                            PrompterPro does not knowingly collect personal information from children under 13. If you believe a child has provided personal information, contact us immediately.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="mb-4">
                            We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                            <p className="font-bold text-xl">PrompterPro</p>
                            <p className="flex items-center gap-2">📍 1 Library Avenue, Millbrae, California</p>
                            <p className="flex items-center gap-2">
                                🌐{" "}
                                <Link href="https://prompterpro.com" className="text-primary underline">
                                    https://prompterpro.com
                                </Link>
                            </p>
                            <p className="flex items-center gap-2 font-medium">📧 prompterai.co@gmail.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

