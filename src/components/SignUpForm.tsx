"use client";
import { useGlobalContext } from "@/context/store";
import { post } from "@/utils/fetchApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { setShowToast, setToastData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword || !name || !terms) {
      setToastData({
        message: "Todos os campos são obrigatórios",
        type: "error",
      });
      setShowToast(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setToastData({
        message: "A senha e a confirmação de senha devem ser iguais",
        type: "error",
      });
      setShowToast(true);
      setLoading(false);
      return;
    }

    setLoading(true);

    const loginData = {
      user: { email: email, name: name, password: password },
    };

    post("/users", loginData)
      .then((res) => {
        if (res instanceof Error) {
          // ajustar formatação da mensagem de erro
          let errorMessage = res.message;
          try {
            const errorObject = JSON.parse(errorMessage);
            if (errorObject.error) {
              errorMessage = errorObject.error;
            }
          } catch (e) {
            console.error(e);
          }
          setToastData({ message: errorMessage, type: "error" });
        } else if (res.status === 201) {
          setToastData({
            message: "Cadastro realizado com sucesso",
            type: "success",
          });
          router.push("/login");
        }
      })
      .catch((error) => {
        setToastData({
          message: "Erro ao fazer login",
          type: "error",
        });
      })
      .finally(() => {
        setShowToast(false);
        setTimeout(() => setShowToast(true), 0);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto w-full max-w-lg text-primary">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" className="text-center text-tertiary">
            Cadastro
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph">
            Criei sua conta.
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Seu Nome
          </Typography>
          <Input
            color="deep-purple"
            crossOrigin={undefined}
            label="Nome"
            size="md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography className="-mb-2" variant="h6">
            Seu Email
          </Typography>
          <Input
            color="deep-purple"
            crossOrigin={undefined}
            label="Email"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography className="-mb-2" variant="h6">
            Sua Senha
          </Typography>
          <Input
            color="deep-purple"
            crossOrigin={undefined}
            label="Senha"
            size="md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography className="-mb-2" variant="h6">
            Confirmar senha
          </Typography>
          <Input
            color="deep-purple"
            crossOrigin={undefined}
            label="Confirme a senha"
            size="md"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="-ml-2.5 -mt-3">
            <Checkbox
              color="deep-purple"
              crossOrigin={undefined}
              label="Aceito os termos de uso"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            className="bg-orange-gradient"
            type="submit"
            fullWidth
            disabled={loading}
          >
            Cadastrar
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Ainda não tem uma conta?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="deep-purple"
              className="ml-1 font-bold"
            >
              Fazer login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUpForm;
