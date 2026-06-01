// NOTE: Original @ai-sdk/anthropic and @ai-sdk/openai providers are commented out
// and replaced with OpenRouter due to missing $5 Anthropic credits.
// To revert: uncomment the original imports and functions, remove OpenRouter code.

// import { anthropic } from "@ai-sdk/anthropic";
// import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  findSupportedChatModel,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@hydracode/shared";
import type { LanguageModel } from "ai";

// OpenRouter instance — replace with anthropic/openai when credits are available
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

type AnthropicModelId = Extract<SupportedChatModel, { provider: "anthropic" }>["id"];
type OpenAIModelId = Extract<SupportedChatModel, { provider: "openai" }>["id"];

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
};

function assertUnsupportedProvider(provider: never): never {
  throw new Error(`Unsupported provider: ${provider}`);
};

// ORIGINAL (restore when Anthropic credits available):
// function resolveAnthropicModel(modelId: AnthropicModelId): ResolvedModel {
//   return {
//     model: anthropic(modelId),
//     provider: "anthropic",
//     modelId,
//   };
// };
function resolveAnthropicModel(modelId: AnthropicModelId): ResolvedModel {
  return {
    model: openrouter(`anthropic/${modelId}`),
    provider: "anthropic",
    modelId,
  };
};

// ORIGINAL (restore when OpenAI credits available):
// function resolveOpenAIModel(modelId: OpenAIModelId): ResolvedModel {
//   return {
//     model: openai(modelId),
//     provider: "openai",
//     modelId,
//   };
// };
function resolveOpenAIModel(modelId: OpenAIModelId): ResolvedModel {
  return {
    model: openrouter(`openai/${modelId}`),
    provider: "openai",
    modelId,
  };
};

function resolveSupportedChatModel(model: SupportedChatModel): ResolvedModel {
  const provider = model.provider;

  switch (provider) {
    case "anthropic":
      return resolveAnthropicModel(model.id);
    case "openai":
      return resolveOpenAIModel(model.id);
    default:
      return assertUnsupportedProvider(provider);
  }
};

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
};

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveSupportedChatModel(model);
};