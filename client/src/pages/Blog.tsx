import { Link } from "wouter";
import { BLOG_POSTS, getRecentPosts, type BlogPost } from "../data/blogPosts";
import { getBlogImage, handleImageError } from "../data/blogImages";
import { ShareBar } from "../components/ShareBar";

const CATEGORIES: { id: BlogPost["category"]; label: string; emoji: string }[] = [
  { id: "space-agi", label: "Space AGI", emoji: "🧠" },
  { id: "agi-research", label: "AGI Research", emoji: "🔬" },
  { id: "robot-engineering", label: "Robot Engineering", emoji: "🤖" },
  { id: "space-engineering", label: "Space Engineering", emoji: "⚙️" },
  { id: "nasa-news", label: "NASA News", emoji: "🚀" },
  { id: "space-facts", label: "Space Facts", emoji: "⭐" },
  { id: "satellite-tutorials", label: "Satellite Tutorials", emoji: "🛰️" },
  { id: "astronomy-lessons", label: "Astronomy Lessons", emoji: "🔭" },
  { id: "aerodynamics", label: "Aerodynamics", emoji: "✈️" },
  { id: "quantum-physics", label: "Quantum & Space", emoji: "⚛" },
];

export function Blog() {
  const recent = getRecentPosts(12);
  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    posts: BLOG_POSTS.filter((p) => p.category === cat.id),
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Blog & News</p>
        <h1 className="headline">Space Blog & News</h1>
        <p className="subhead max-w-2xl">
          Daily NASA news, space facts, satellite tutorials, and astronomy lessons. Fresh content to help you learn orbital mechanics, space physics, and how satellites work.
        </p>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {byCategory.map((cat) => (
          <Link key={cat.id} href={`/blog/category/${cat.id}`}>
            <a className="blog-card block p-4 rounded-xl border-2 transition hover:shadow-lg" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              <h2 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>{cat.label}</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{cat.posts.length} articles</p>
            </a>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Latest articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="post-card block rounded-xl border-2 overflow-hidden transition hover:shadow-lg hover:scale-[1.01]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <div className="aspect-video w-full" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 100%)" }}>
                  <img
                    src={getBlogImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>{post.category.replace("-", " ")}</span>
                  <h3 className="font-bold text-lg mt-1 mb-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.06) 100%)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>📰 Daily fresh content</h2>
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          New articles added regularly covering NASA missions, space facts, satellite tutorials, and astronomy lessons. Bookmark this page and check back daily!
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/rss.xml"><a className="text-[var(--accent-cyan)] hover:underline">RSS Feed</a></Link> available for automatic updates.
        </p>
      </section>

      <ShareBar path="/blog" title="Space Blog — 110+ Articles on NASA, AGI, Orbital Mechanics | Orbital Simulator Hub" showRedditSubs />
    </div>
  );
}
