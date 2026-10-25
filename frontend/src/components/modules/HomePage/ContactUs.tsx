"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  //   MessageSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const ContactUs = () => {
  return (
    <section className="pb-12 pt-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our services or need help as a provider? Our
            team at MNA ServiceHub is here to support you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
            {/* <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-primary size-6" />
              Contact Information
            </h3> */}

            <div className="group">
              <Card className="border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent/10 hover:translate-x-2">
                <CardContent className="px-6 py-2 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                    <Mail className="text-primary size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="text-muted-foreground select-all">
                      admin@servicehub.com
                    </p>
                    <p className="text-xs text-primary mt-1 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="size-3" /> Average response: 2h
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent/10 hover:translate-x-2">
                <CardContent className="px-6 py-2 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                    <Phone className="text-primary size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Call Support</h4>
                    <p className="text-muted-foreground">+880 1723-542847</p>
                    <p className="text-muted-foreground text-sm">
                      Sat-Thu, 10am - 8pm
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group">
              <Card className="border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent/10 hover:translate-x-2">
                <CardContent className="px-6 py-2 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
                    <MapPin className="text-primary size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Headquarters</h4>
                    <p className="text-muted-foreground">Dhaka, Bangladesh</p>
                    <p className="text-sm text-muted-foreground italic">
                      MNA ServiceHub Plaza
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5 transition-colors hover:border-primary/40">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Clock className="size-5 animate-pulse" />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  Availability
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our MNA ServiceHub platform is active 24/7. Human support is
                available during business hours.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="rounded-md p-8 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10" />

              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold px-1">
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      className="h-12 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold px-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold px-1">
                    How can we help?
                  </label>

                  <div className="relative group">
                    <select className="flex h-12 w-full rounded-md border border-muted-foreground/20 bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer pr-10">
                      <option>General Inquiry</option>
                      <option>Service Provider Registration</option>
                      <option>Customer Support</option>
                      <option>Partnership/IT Agency</option>
                      <option>Technical Issue</option>
                    </select>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <ChevronDown className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold px-1">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Describe your inquiry in detail..."
                    className="min-h-40 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary transition-all resize-none p-4"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-md font-bold group bg-primary hover:bg-primary/90 transition-all duration-300 active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Button>

                <p className="text-center text-[11px] text-muted-foreground uppercase tracking-tighter">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
