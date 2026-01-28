import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-background rounded-lg shadow-sm border">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy for PrompterPro Chrome Extension</h1>
                    <p className="mb-4 text-muted-foreground uppercase tracking-wider text-sm font-semibold">
                        Effective Date: January 28, 2026
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
                        <h2 className="text-2xl font-semibold mb-4">1. Data Collection Overview</h2>
                        <p className="mb-4">This section provides a comprehensive overview of all data we collect, how we collect it, and why.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Chrome Extension Data Collection</h3>
                        <p className="mb-2">The PrompterPro Chrome Extension collects the following limited information:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Authentication tokens:</strong> Collected when you log in; used to verify your identity and maintain your session</li>
                            <li><strong>User preferences:</strong> Collected when you adjust settings; stored locally in your browser to personalize your experience</li>
                            <li><strong>Extension state data:</strong> Collected during Extension use; stored locally to maintain functionality across browser sessions</li>
                        </ul>
                        <p className="mb-4 italic text-sm">All Extension data is stored locally in your browser and is NOT transmitted to our servers except authentication tokens for verification purposes.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Website Data Collection</h3>
                        <p className="mb-2">When you create an account or use our website, we collect:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Email address:</strong> Collected during account registration; used for authentication, account recovery, and service-related communications</li>
                            <li><strong>Password:</strong> Collected during registration; stored in encrypted form; used for authentication</li>
                            <li><strong>Account creation date:</strong> Automatically collected; used for account management and analytics</li>
                            <li><strong>Subscription status:</strong> Collected during payment processing; used to grant appropriate access levels</li>
                            <li><strong>Usage data:</strong> Automatically collected during website use; includes pages visited, features used, and timestamps; used for service improvement and analytics</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Automatically Collected Information</h3>
                        <p className="mb-2">When you visit our website, we automatically collect:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>IP address:</strong> Collected automatically; used for security, fraud prevention, and geographic analytics</li>
                            <li><strong>Browser type and version:</strong> Collected automatically; used to ensure compatibility and optimize user experience</li>
                            <li><strong>Device information:</strong> Collected automatically; includes operating system and device type; used for optimization</li>
                            <li><strong>Referral source:</strong> Collected automatically; used to understand how users find our service</li>
                            <li><strong>Page views and session duration:</strong> Collected automatically; used for analytics and service improvement</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold text-red-600 dark:text-red-400">Data We Do NOT Collect</h3>
                        <p className="mb-2">We want to be clear about what we do NOT collect:</p>
                        <ul className="list-disc pl-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <li>Browsing history outside our services</li>
                            <li>Content from other websites</li>
                            <li>Keystroke logging or screen captures</li>
                            <li>Personal messages or chat contents</li>
                            <li>Credit card numbers or payment details (handled by Stripe)</li>
                            <li>Social Security numbers or government IDs</li>
                            <li>Biometric data</li>
                            <li>Location data beyond regional IP geolocation</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
                        <p className="mb-4">We use the collected data for the following specific purposes:</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Service Provision</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Authenticate user access to the Extension and website</li>
                            <li>Maintain user preferences and settings</li>
                            <li>Provide core Extension functionality</li>
                            <li>Process and manage subscriptions</li>
                            <li>Deliver customer support and respond to inquiries</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Service Improvement</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Analyze usage patterns to improve features</li>
                            <li>Identify and fix technical issues</li>
                            <li>Develop new features based on user needs</li>
                            <li>Optimize website and Extension performance</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Security and Fraud Prevention</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Detect and prevent fraudulent activities</li>
                            <li>Monitor for security threats</li>
                            <li>Enforce our Terms of Service</li>
                            <li>Protect user accounts from unauthorized access</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Legal Compliance</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Comply with applicable laws and regulations</li>
                            <li>Respond to legal requests and prevent harm</li>
                            <li>Enforce our legal rights</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Infrastructure</h2>
                        <p className="mb-4">This section details where and how your data is stored.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Storage Locations</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Extension Data:</strong> Stored locally in your browser using standard browser storage APIs (localStorage). This data never leaves your device unless you explicitly authenticate with our servers.</li>
                            <li><strong>Website Data:</strong> Stored on secure cloud servers. Our hosting infrastructure may utilize cloud service providers with data centers located in the United States and other regions to ensure service reliability and performance.</li>
                            <li><strong>Database:</strong> User account information and subscription data are stored in secure, encrypted databases hosted by reputable cloud infrastructure providers.</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Data Security Measures</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Encryption in transit:</strong> All data transmitted between your browser and our servers is encrypted using industry-standard TLS/SSL protocols</li>
                            <li><strong>Encryption at rest:</strong> Sensitive data stored in our databases is encrypted</li>
                            <li><strong>Access controls:</strong> Strict access controls limit who can access user data within our organization</li>
                            <li><strong>Regular security audits:</strong> We conduct regular security assessments to identify and address vulnerabilities</li>
                        </ul>

                        <p className="mb-4 text-sm italic">While we implement industry-standard security measures, no system is completely secure. We cannot guarantee absolute security of data transmitted over the internet.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services and Data Sharing</h2>
                        <p className="mb-4 font-semibold">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                        <p className="mb-4">We share user data only with the following categories of third parties, and only as necessary to provide our services:</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Payment Processing</h3>
                        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                            <p className="font-semibold mb-2">Stripe, Inc.</p>
                            <p className="mb-2"><strong>Purpose:</strong> Process subscription payments and manage billing</p>
                            <p className="mb-2"><strong>Data Shared:</strong> Email address, payment information (credit card details are handled directly by Stripe and never touch our servers), transaction amounts, subscription status</p>
                            <p className="mb-2"><strong>Privacy Policy:</strong> <Link href="https://stripe.com/privacy" className="text-primary underline">https://stripe.com/privacy</Link></p>
                            <p className="text-sm italic">Stripe is PCI-DSS compliant and handles all payment card data securely.</p>
                        </div>

                        <h3 className="text-xl font-medium mb-2 font-bold">Hosting and Infrastructure Providers</h3>
                        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                            <p className="mb-2"><strong>Purpose:</strong> Host our website, store data, and ensure service availability</p>
                            <p className="mb-2"><strong>Data Shared:</strong> All website data including user accounts, usage data, and system logs may be stored on infrastructure provided by cloud hosting services</p>
                            <p className="text-sm italic">We use reputable cloud infrastructure providers that comply with industry-standard security and privacy practices.</p>
                        </div>

                        <h3 className="text-xl font-medium mb-2 font-bold">Email Service Providers</h3>
                        <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded border">
                            <p className="mb-2"><strong>Purpose:</strong> Send transactional emails (account verification, password resets, subscription notifications)</p>
                            <p className="mb-2"><strong>Data Shared:</strong> Email addresses, user names, email content</p>
                            <p className="text-sm italic">We do not use email service providers for marketing purposes without your explicit consent.</p>
                        </div>

                        <h3 className="text-xl font-medium mb-2 font-bold">Legal and Safety</h3>
                        <p className="mb-2">We may share user data when we believe in good faith that disclosure is necessary to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Comply with applicable laws, regulations, or legal processes</li>
                            <li>Respond to valid requests from law enforcement or government authorities</li>
                            <li>Protect the rights, property, or safety of PrompterPro, our users, or the public</li>
                            <li>Detect, prevent, or address fraud, security, or technical issues</li>
                            <li>Enforce our Terms of Service or other agreements</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Business Transfers</h3>
                        <p className="mb-4">In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, user data may be transferred to the successor entity. We will notify users of any such change via email or prominent notice on our website.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. International Data Transfers</h2>
                        <p className="mb-4">Our services are operated from the United States. If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States and other countries where our service providers operate.</p>
                        <p className="mb-4">These countries may have data protection laws that differ from those in your country of residence. By using our services, you consent to the transfer of your information to the United States and other countries as described in this Privacy Policy.</p>
                        <p className="mb-4">We implement appropriate safeguards to ensure your data is protected in accordance with this Privacy Policy, regardless of where it is processed.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                        <p className="mb-4">We retain different types of data for different periods, based on the purpose for which it was collected:</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Account Data</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Active accounts:</strong> We retain your account data for as long as your account remains active</li>
                            <li><strong>Deleted accounts:</strong> Upon account deletion, we delete or anonymize your personal information within 30 days, except where retention is required by law</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Transaction Records</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Payment and transaction records are retained for 7 years to comply with financial record-keeping requirements</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Usage Data and Logs</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Server logs and usage data are typically retained for 90 days for security and analytics purposes</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Extension Local Data</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Data stored locally in your browser persists until you uninstall the Extension or clear your browser data</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Your Privacy Rights</h2>
                        <p className="mb-4">You have the following rights regarding your personal data:</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Access</h3>
                        <p className="mb-4">You have the right to request a copy of the personal information we hold about you. We will provide this information in a commonly used electronic format.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Correction</h3>
                        <p className="mb-4">You have the right to request correction of inaccurate or incomplete personal information. You can update most information directly through your account settings.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Deletion</h3>
                        <p className="mb-4">You have the right to request deletion of your personal information, subject to certain exceptions (e.g., legal obligations to retain certain records). To delete your account and associated data, contact us using the information below.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Data Portability</h3>
                        <p className="mb-4">You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Withdraw Consent</h3>
                        <p className="mb-4">Where we process your data based on consent, you have the right to withdraw that consent at any time.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Right to Object</h3>
                        <p className="mb-4">You have the right to object to certain types of processing, including processing for direct marketing purposes.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">How to Exercise Your Rights</h3>
                        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800 mb-4">
                            <p className="mb-2 font-semibold">To exercise any of these rights, contact us at:</p>
                            <p className="font-medium text-lg mb-2">📧 prompterai.co@gmail.com</p>
                            <p className="text-sm">Please include "Privacy Rights Request" in the subject line and provide:</p>
                            <ul className="list-disc pl-6 text-sm">
                                <li>Your full name and email address associated with your account</li>
                                <li>A description of your specific request</li>
                                <li>Any additional information needed to verify your identity</li>
                            </ul>
                        </div>
                        <p className="text-sm italic mb-4">We will respond to your request within 30 days. We may need to verify your identity before processing certain requests to protect your privacy and security.</p>
                        <p className="text-sm italic">You will not be discriminated against for exercising your privacy rights. You will receive the same quality of service whether or not you exercise your privacy rights.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. California Privacy Rights (CCPA/CPRA)</h2>
                        <p className="mb-4">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Categories of Personal Information Collected</h3>
                        <p className="mb-2">In the past 12 months, we have collected the following categories of personal information:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Identifiers (email address, account ID)</li>
                            <li>Internet or network activity (usage data, IP address)</li>
                            <li>Commercial information (subscription status, payment history)</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Sale or Sharing of Personal Information</h3>
                        <p className="mb-4 font-semibold">We do NOT sell or share your personal information for cross-context behavioral advertising.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">CCPA Rights</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Right to know what personal information we collect, use, disclose, and sell</li>
                            <li>Right to request deletion of personal information</li>
                            <li>Right to correct inaccurate personal information</li>
                            <li>Right to opt-out of the sale or sharing of personal information (not applicable as we don't sell or share data)</li>
                            <li>Right to limit use of sensitive personal information (not applicable as we don't collect or use sensitive personal information beyond what's necessary)</li>
                            <li>Right to non-discrimination for exercising your CCPA rights</li>
                        </ul>

                        <p className="mb-4">To exercise these rights, contact us at <strong>prompterai.co@gmail.com</strong> with "CCPA Request" in the subject line.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
                        <p className="mb-4">We use cookies and similar tracking technologies on our website to enhance your experience and analyze usage.</p>

                        <h3 className="text-xl font-medium mb-2 font-bold">Types of Cookies We Use</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., maintaining login sessions)</li>
                            <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 font-bold">Managing Cookies</h3>
                        <p className="mb-4">You can control and manage cookies through your browser settings. Note that disabling certain cookies may impact website functionality.</p>
                        <p className="mb-4 font-semibold">The Chrome Extension itself does NOT use third-party tracking cookies or analytics.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
                        <p className="mb-4">Our website and Extension may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party sites.</p>
                        <p className="mb-4">We are not responsible for the privacy practices of third-party websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
                        <p className="mb-4">PrompterPro is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
                        <p className="mb-4">If you believe a child under 13 has provided us with personal information, please contact us immediately at <strong>prompterai.co@gmail.com</strong>, and we will take steps to delete such information from our systems.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.</p>
                        <p className="mb-4">When we make material changes to this Privacy Policy, we will:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Update the "Effective Date" at the top of this policy</li>
                            <li>Notify you via email (if you have an account)</li>
                            <li>Display a prominent notice on our website</li>
                        </ul>
                        <p className="mb-4">We encourage you to review this Privacy Policy periodically. Your continued use of our services after changes are posted constitutes your acceptance of the updated Privacy Policy.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
                        <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
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
                        <p className="mt-4 text-sm italic">We will respond to all inquiries within a reasonable timeframe, typically within 30 days.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">14. Summary of Data Practices</h2>
                        <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                            <p className="font-bold text-lg mb-4">Quick Reference Guide</p>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="font-semibold mb-1">What We Collect:</p>
                                    <p>Email addresses, authentication data, usage statistics, IP addresses, browser information</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">How We Collect It:</p>
                                    <p>Through account registration, Extension usage, and automatic website analytics</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">How We Use It:</p>
                                    <p>To provide services, improve functionality, process payments, ensure security, and comply with legal obligations</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">How We Store It:</p>
                                    <p>Extension data stored locally in browser; account data stored on encrypted cloud servers in the United States</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">Who We Share It With:</p>
                                    <p>Stripe (payments), hosting providers (infrastructure), email services (transactional emails), legal authorities (when required by law)</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">Your Rights:</p>
                                    <p>Access, correct, delete, or export your data; withdraw consent; object to processing</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">We Do NOT:</p>
                                    <p>Sell your data, share it with advertisers, track you across other websites, or collect sensitive information beyond what's necessary</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
