/**
 * Minimal local types mirroring @elizaos/core's plugin contract. Lets the
 * plugin compile standalone without pulling the full ElizaOS runtime as
 * a hard dependency. When installed in an ElizaOS project, the actual
 * core types take over via peer-dep.
 */
export type Action = {
    name: string;
    similes?: string[];
    description: string;
    examples?: ActionExample[][];
    validate: (runtime: AgentRuntime, message: Memory) => Promise<boolean>;
    handler: (runtime: AgentRuntime, message: Memory, state?: State, options?: Record<string, unknown>, callback?: HandlerCallback) => Promise<boolean | unknown>;
};
export type Provider = {
    name?: string;
    description?: string;
    get: (runtime: AgentRuntime, message: Memory, state?: State) => Promise<string | null>;
};
export type Evaluator = {
    name: string;
    description: string;
    similes?: string[];
    validate: (runtime: AgentRuntime, message: Memory) => Promise<boolean>;
    handler: (runtime: AgentRuntime, message: Memory, state?: State) => Promise<unknown>;
};
export type Plugin = {
    name: string;
    description: string;
    actions?: Action[];
    evaluators?: Evaluator[];
    providers?: Provider[];
};
export type AgentRuntime = any;
export type Memory = any;
export type State = any;
export type HandlerCallback = (response: {
    text: string;
}) => void;
export type ActionExample = {
    user: string;
    content: {
        text: string;
        action?: string;
    };
};
//# sourceMappingURL=types.d.ts.map