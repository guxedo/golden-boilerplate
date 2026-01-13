import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Unlock Your Potential with Golden Stack
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    The ultimate full-stack boilerplate for modern web applications.
                                    Scalable, secure, and ready for production.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link to="/register">
                                    <Button size="lg" className="h-11 px-8">Get Started</Button>
                                </Link>
                                <Link to="/login">
                                    <Button size="lg" variant="outline" className="h-11 px-8">Sign In</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Double Lock Auth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Secure authentication flow with user verification and admin approval steps.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Role-Based ACL</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Granular access control ensuring users only see what they are supposed to.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Modern Tech Stack</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Built with React, NestJS, TailwindCSS, and Prisma on a Turborepo foundation.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Social Proof Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Innovators</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Join the hundreds of companies building their future with our stack.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 opacity-50">
                                {/* Placeholder Logos */}
                                <div className="flex items-center justify-center font-bold text-xl">Acme Corp</div>
                                <div className="flex items-center justify-center font-bold text-xl">Globex</div>
                                <div className="flex items-center justify-center font-bold text-xl">Soylent</div>
                                <div className="flex items-center justify-center font-bold text-xl">Initech</div>
                                <div className="flex items-center justify-center font-bold text-xl">Umbrella</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 Golden Stack Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link to="/" className="text-xs hover:underline underline-offset-4">Terms of Service</Link>
                    <Link to="/" className="text-xs hover:underline underline-offset-4">Privacy</Link>
                </nav>
            </footer>
        </div>
    );
}
