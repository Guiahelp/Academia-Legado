"use client";

const howItWorksSteps = [
    { number: "01", title: "Membresía", description: "Únete a la base del programa" },
    { number: "02", title: "Educa", description: "Completa los módulos de tu nivel actual" },
    { number: "03", title: "Verifica", description: "Tu progreso comprobado te permite ascender" },
    { number: "04", title: "Aumenta", description: "Desbloquea herramientas y círculos exclusivos" },
];

export const HowItWorks = () => {
    return (
        <div className="w-full max-w-md mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-bold text-center mb-6 text-foreground">
                CÓMO <span className="text-primary">FUNCIONA</span>
            </h2>
            <div className="space-y-3">
                {howItWorksSteps.map((step, index) => (
                    <div
                        key={index}
                        className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all duration-300"
                    >
                        <span className="text-2xl font-bold text-primary/60">{step.number}</span>
                        <div>
                            <p className="text-sm text-foreground font-semibold">{step.title}</p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
