.PHONY: help install setup deploy dev dev-web dev-api start api-start build lint gen m prisma-deploy prisma-studio

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## Install project dependencies
	npm install


dev: ## Run Next.js and Express API in development mode
	npm run dev

build: ## Generate Prisma client and build Next.js
	npm run build

lint: ## Run ESLint
	npm run lint

gen: ## Generate Prisma client
	npm run prisma:generate

m: ## Create/apply local Prisma migrations
	npm run prisma:migrate

deploy: ## Install, run migrations, deploy migrations, and build for production
	npm run prisma:migrate
	npm run prisma:deploy

studio: ## Open Prisma Studio
	npx prisma studio
