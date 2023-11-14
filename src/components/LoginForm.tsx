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

const LoginForm = () => {
  const { setUserData, setToken, setShowToast, setToastData, setIsLoggedIn } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (!email || !password) {
      setToastData({
        message: "Todos os campos são obrigatórios",
        type: "error",
      });
      setShowToast(true);
      setLoading(false);
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    post("/login", loginData)
      .then((res) => {
        if (res instanceof Error) {
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
        } else if (res.status === 200) {
          setUserData(res.data.user);
          setToken(res.data.token);
          setIsLoggedIn(true);
          setToastData({ message: "Login feito com sucesso", type: "success" });
          router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
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
      <Card className="mx-auto w-full max-w-[24rem] text-primary">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" className="text-center text-tertiary">
            Login
          </Typography>
          <Typography className="mb-3 font-normal" variant="paragraph">
            Entre com seu email e senha.
          </Typography>
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
          <div className="-ml-2.5 -mt-3">
            {/* implmetar cookies */}
            <Checkbox
              color="deep-purple"
              crossOrigin={undefined}
              label="Quero continuar logado"
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
            Entrar
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Ainda não tem uma conta?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="deep-purple"
              className="ml-1 font-bold"
            >
              Criar conta
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
