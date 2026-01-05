import { ContentLayout } from "@/components/admin-panel/content-layout";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <ContentLayout title="Privacy Policy">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-background rounded-lg shadow-sm border">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <p className="mb-4">
                        PrompterPro we operate the website{" "}
                        <Link href="https://prompterpro.com" className="text-primary underline">
                            https://prompterpro.com
                        </Link>{" "}
                        the chrome extension. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our Service.
                    </p>
                    <p className="mb-6 font-semibold">
                        If you do not agree with this Privacy Policy, please do not use our website or services.
                    </p>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                        <p className="mb-4">We may collect the following types of information:</p>
                        <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Email address (when you sign up, contact us, or use our services)</li>
                        </ul>
                        <h3 className="text-xl font-medium mb-2">Payment Information</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Payments are processed securely through Stripe</li>
                            <li>We do not store your credit card or payment details</li>
                            <li>Stripe may collect payment data in accordance with its own privacy policy</li>
                        </ul>
                        <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
                        <ul className="list-disc pl-6">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Device information</li>
                            <li>Pages visited and usage data</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                        <p className="mb-2">We use the information we collect to:</p>
                        <ul className="list-disc pl-6">
                            <li>Provide and maintain our services</li>
                            <li>Process payments</li>
                            <li>Communicate with you</li>
                            <li>Improve our website and offerings</li>
                            <li>Comply with legal obligations</li>
                            <li>Prevent fraud and abuse</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Share Your Information</h2>
                        <p className="mb-4">We do not sell your personal information.</p>
                        <p className="mb-2">We may share information with:</p>
                        <ul className="list-disc pl-6">
                            <li>Stripe to operate our services</li>
                            <li>Legal authorities if required by law</li>
                            <li>Business transfers in the event of a merger, sale, or acquisition</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking Technologies (CalOPPA)</h2>
                        <p className="mb-2">We may use cookies or similar technologies to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Improve user experience</li>
                            <li>Analyze traffic and usage patterns</li>
                        </ul>
                        <p>You can disable cookies through your browser settings.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. California Privacy Rights (CCPA & CPRA)</h2>
                        <p className="mb-4">If you are a California resident, you have the following rights:</p>
                        <h3 className="text-xl font-medium mb-2">Your Rights Include:</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>The right to know what personal information we collect</li>
                            <li>The right to request deletion of your personal information</li>
                            <li>The right to correct inaccurate personal information</li>
                            <li>The right to opt out of the sale or sharing of personal data (we do not sell data)</li>
                            <li>The right to non-discrimination for exercising your privacy rights</li>
                        </ul>
                        <h3 className="text-xl font-medium mb-2">How to Exercise Your Rights</h3>
                        <p className="mb-4">You may submit a request by contacting us at:</p>
                        <p className="font-medium">📧 prompterai.co@gmail.com</p>
                        <p className="mt-4">We will verify your request and respond within the time required by law.</p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                        <p className="mb-2">We retain personal information only as long as necessary to:</p>
                        <ul className="list-disc pl-6">
                            <li>Provide our services</li>
                            <li>Comply with legal requirements</li>
                            <li>Resolve disputes and enforce agreements</li>
                        </ul>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
                        <p>
                            We take reasonable administrative, technical, and physical measures to protect your information. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Children’s Information</h2>
                        <p>
                            PrompterPro does not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal information, please contact us immediately.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                        </p>
                    </section>

                    <hr className="my-8" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                        <div className="space-y-1">
                            <p className="font-bold">PrompterPro</p>
                            <p>📍 1 Library Avenue, Millbrae, California</p>
                            <p>
                                🌐{" "}
                                <Link href="https://prompterpro.com" className="text-primary underline">
                                    https://prompterpro.com
                                </Link>
                            </p>
                            <p>📧 prompterai.co@gmail.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </ContentLayout>
    );
}
