# Orbitalsimulatorhub Agent Operating Model

## Purpose

This registry defines 137 specialized roles for a governed engineering program. It is a planning and ownership model, not permission for autonomous agents to change production.

## Delivery flow

1. The Chief Orchestrator creates scoped work items and assigns one implementation owner.
2. Implementation occurs on a feature branch or `pre-production`.
3. Independent quality, security, and review roles validate the work.
4. The `pre-production` workflow runs the required test and build checks and deploys a Vercel preview.
5. A release owner promotes only the tested `pre-production` commit to `main`.
6. Vercel deploys production from `main`; rollback uses a known-good production commit.

## Non-negotiable controls

- No agent pushes directly to `main`.
- No agent may access, print, or commit secrets.
- Each agent stays inside its assigned paths unless the orchestrator approves a dependency change.
- Research content is labeled conceptual where appropriate and cites primary or peer-reviewed sources.
- Review agents are independent of the implementation owner.
- Browser APIs, live orbital data, voice, WebXR, analytics, and external publishing require explicit consent and credentials.

## Role groups

The machine-readable source of truth is [`registry.json`](registry.json). It contains:

- 1 orchestration role
- 12 domain leads
- 108 specialist implementation and research roles
- 20 quality and security roles
- 8 release and governance roles

## Required evidence for promotion

- Passing `npm run test:run -- --passWithNoTests`
- Passing `npm run build`
- Vercel preview status
- Review of UI, accessibility, security, and source claims where relevant
- A concise release note and rollback target
