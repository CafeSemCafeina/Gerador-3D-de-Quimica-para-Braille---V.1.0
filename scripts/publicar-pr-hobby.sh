#!/usr/bin/env bash
# Publica um PR de outra pessoa no main com VOCÊ como author.
# O Vercel Hobby só aceita deploy se o author do commit for o dono
# da conta. Squash no GitHub deixa o autor original e o deploy quebra.
# Aqui o squash é local, no seu nome, com crédito em Co-authored-by.
#
# Uso (clone do SEU repo, gh logado na SUA conta):
#   ./scripts/publicar-pr-hobby.sh 17
#   ./scripts/publicar-pr-hobby.sh https://github.com/CafeSemCafeina/Gerador-3D-de-Quimica-para-Braille---V.1.0/pull/2
#   ./scripts/publicar-pr-hobby.sh --push 17
#
# Não empurra a menos que passe --push.

set -euo pipefail

PUSH=0
PR_REF=""

for arg in "$@"; do
  case "$arg" in
    --push) PUSH=1 ;;
    -h|--help)
      sed -n '2,14p' "$0"
      exit 0
      ;;
    *)
      if [[ -n "$PR_REF" ]]; then
        echo "Use só um PR (número ou URL)." >&2
        exit 1
      fi
      PR_REF="$arg"
      ;;
  esac
done

if [[ -z "$PR_REF" ]]; then
  echo "Uso: $0 [--push] <número-ou-url-do-pr>" >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Instale o GitHub CLI (gh) e faça gh auth login." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree suja. Commit ou stash antes de publicar." >&2
  exit 1
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

DEFAULT_BRANCH="$(gh repo view --json defaultBranchRef --jq .defaultBranchRef.name)"
git fetch origin "$DEFAULT_BRANCH"
git checkout "$DEFAULT_BRANCH"
git pull --ff-only origin "$DEFAULT_BRANCH"

TITLE="$(gh pr view "$PR_REF" --json title --jq .title)"
PR_URL="$(gh pr view "$PR_REF" --json url --jq .url)"
HEAD_REF="$(gh pr view "$PR_REF" --json headRefName --jq .headRefName)"
HEAD_OWNER="$(gh pr view "$PR_REF" --json headRepositoryOwner --jq .headRepositoryOwner.login)"
HEAD_REPO="$(gh pr view "$PR_REF" --json headRepository --jq .headRepository.name)"

WORK_BRANCH="pr-hobby-$$"
git fetch "https://github.com/${HEAD_OWNER}/${HEAD_REPO}.git" "${HEAD_REF}:${WORK_BRANCH}"

COAUTHORS="$(
  git log "${DEFAULT_BRANCH}..${WORK_BRANCH}" --format='%an <%ae>' \
    | grep -v '^[[:space:]]*$' \
    | sort -u \
    | { grep -v -F "$(git config user.email)" || true; } \
    | sed 's/^/Co-authored-by: /'
)"

git merge --squash "$WORK_BRANCH"

if git diff --cached --quiet; then
  echo "Nada para commitar (já está no ${DEFAULT_BRANCH}?). " >&2
  git branch -D "$WORK_BRANCH" >/dev/null 2>&1 || true
  exit 1
fi

git commit -m "${TITLE}

Aplicado a partir de ${PR_URL} para o deploy no Vercel Hobby
(author = dono da conta; crédito no Co-authored-by).

${COAUTHORS}
"

git branch -D "$WORK_BRANCH" >/dev/null 2>&1 || true

echo
echo "Commit no ${DEFAULT_BRANCH}:"
git log -1 --format='  %h  %an <%ae>%n  %s'
echo
if [[ -n "$COAUTHORS" ]]; then
  echo "$COAUTHORS"
  echo
fi

if [[ "$PUSH" -eq 1 ]]; then
  git push origin "$DEFAULT_BRANCH"
  echo "Push feito. O Vercel deve publicar se o author acima for você."
else
  echo "Revise com git show e depois:"
  echo "  git push origin ${DEFAULT_BRANCH}"
  echo "Ou rode de novo com --push."
fi
