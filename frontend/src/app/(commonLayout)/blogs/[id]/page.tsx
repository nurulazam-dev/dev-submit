"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { blogs } from "../../../../constants/blogData";
import { Badge } from "@/components/ui/badge";
import { User, Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const post = blogs.find((b) => b.id === id);

  if (!post) return <div className="text-center py-20">Post not found</div>;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <article className="max-w-4xl mx-auto px-6 pt-20 pb-10">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft
              className="mr-2 group-hover:-translate-x-1 transition-transform"
              size={18}
            />
            Back to Insights
          </Button>
        </Link>

        <Badge className="bg-indigo-600 mb-6">{post.category}</Badge>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-12 text-slate-500 dark:text-slate-400 font-medium border-y border-slate-100 dark:border-slate-800 py-6">
          <div className="flex items-center gap-2">
            <User size={20} className="text-indigo-600" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-indigo-600" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="relative h-75 md:h-100 round-lg overflow-hidden mb-12 shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl font-medium text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {post.description}
          </p>
          <div className="text-slate-800 dark:text-slate-200 leading-loose space-y-6">
            <p>{post.content}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
