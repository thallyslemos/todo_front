"use client";
import Link from "next/link";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-main py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Typography variant="h2" className="mb-6 text-tertiary font-bold">
          Bem-vindo ao V360 TODOLIST
        </Typography>

        <Typography variant="h5" className="mb-6">
          Gerencie suas tarefas de forma eficiente com o V360 TODOLIST
        </Typography>

        <Card className="w-full max-w-xl">
          <CardBody>
            <Typography variant="h4" className="mb-4">
              Como usar
            </Typography>

            <Typography variant="paragraph" className="mb-4">
              1. Navegue até a página de listas de tarefas.
            </Typography>

            <Typography variant="paragraph" className="mb-4">
              2. Crie uma nova lista de tarefas clicando no botão com o símbolo
              de mais.
            </Typography>

            <Typography variant="paragraph" className="mb-4">
              3. Clique no ícone de olho para visualizar uma lista de tarefas.
            </Typography>

            <Typography variant="paragraph" className="mb-4">
              4. Dentro de uma lista de tarefas, você pode criar, editar e
              deletar tarefas.
            </Typography>

            <Typography variant="paragraph" className="mb-4">
              5. Marque a caixa de seleção para marcar uma tarefa como
              concluída.
            </Typography>
          </CardBody>
        </Card>

        <div className="flex mt-6">
          <Link href="/todo" passHref>
            <Button className="bg-orange-gradient">Começar</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
