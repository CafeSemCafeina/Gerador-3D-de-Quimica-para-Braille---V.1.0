# Publicar contribuição no Vercel Hobby

O plano gratuito do Vercel só faz deploy se o **author do commit** for o dono da conta do projeto. Squash ou rebase no botão do GitHub costuma deixar o David como author e o site **não atualiza**.

Não dá para o David “assinar” no seu nome: o Vercel confere a conta GitHub ligada, não só o e-mail.

## O mais simples (tente primeiro)

No PR, use **Create a merge commit** (não Squash, não Rebase).

O commit de merge fica no seu nome. Se o Vercel publicar, pronto. Se aparecer *commit author lacks access*, use o script abaixo.

## Um comando (quando o merge commit falhar)

No clone **deste** repositório, na sua máquina, com `gh` logado na sua conta:

```bash
./scripts/publicar-pr-hobby.sh 17
```

Aceita número ou URL do PR (inclusive PR no fork). Isso:

1. Atualiza o `main`
2. Faz squash da contribuição
3. Cria **um** commit com você de author
4. Coloca `Co-authored-by:` no David (crédito no GitHub)

Revise com `git show` e:

```bash
git push origin main
```

Para empurrar no mesmo passo: `./scripts/publicar-pr-hobby.sh --push 17`

## O que o David faz

Abre o PR normalmente. No corpo do PR ele cola:

```
Para o Vercel Hobby: merge commit, ou
./scripts/publicar-pr-hobby.sh N
```

Ele **não** precisa reescrever o histórico. O “roubo” do commit é esse squash no seu nome, com crédito no `Co-authored-by`.
