"use client";

export default function GoogleMapLocation() {
  const staticIframe =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902316827054!2d90.39063231498135!3d23.75087598458925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x5555555555555555!2sDhaka!5e0!3m2!1sen!2sbd!4v1625555555555!5m2!1sen!2sbd";

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Visit Our <span className="text-primary">Hub</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our physical support centers are located across Dhaka. Feel free to
            drop by for any technical assistance or partnership inquiries.
          </p>
        </div>

        <div className="h-125 lg:h-auto min-h-70 relative rounded-md overflow-hidden border-2 border-background shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
          <iframe
            src={staticIframe}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MNA ServiceHub Location"
            className="absolute inset-0"
          />

          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-border">
            Interactive Map
          </div>
        </div>
      </div>
    </section>
  );
}
