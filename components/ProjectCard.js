export default function ProjectCard({ title, description, tech, link }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition group">
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
        {title}
      </h3>
      <p className="text-gray-400 mb-4">{description}</p>

      {/* Tech Stack Tags */}
      <div className="flex gap-2 flex-wrap mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      
      <a href={link}
        className="text-blue-400 text-sm hover:underline"
        target="_blank"
      >
        View Project →
      </a>
    </div>
  );
}