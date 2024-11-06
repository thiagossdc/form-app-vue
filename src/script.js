Vue.use(VeeValidate);

const dictionary = {
  pt: {
    custom: {
      nome: {
        required: "Por favor, insira seu nome",
      },
      email: {
        required: "Por favor, insira seu e-mail",
        email: "O e-mail deve ser válido",
      },
      assunto: {
        required: "Por favor, escolha um assunto",
      },
      mensagem: {
        required: "Por favor, insira sua mensagem",
      },
    },
  },
};

VeeValidate.Validator.updateDictionary(dictionary);
VeeValidate.Validator.setLocale("pt");

new Vue({
  el: "#form",
  delimiters: ["${", "}"],
  data: {
    submissionStatus: "",
    menuVisible: false,
    errors: {
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        // Limpar mensagens de erro
        this.errors = {
          nome: "",
          email: "",
          assunto: "",
          mensagem: "",
        };

        if (result) {
          this.$refs.contato.submit();
          this.submissionStatus = "Mensagem enviada com sucesso!";
        } else {
          // Coletar mensagens de erro
          this.errors.nome = this.errors.has("nome")
            ? this.$validator.errors.first("nome")
            : "";
          this.errors.email = this.errors.has("email")
            ? this.$validator.errors.first("email")
            : "";
          this.errors.assunto = this.errors.has("assunto")
            ? this.$validator.errors.first("assunto")
            : "";
          this.errors.mensagem = this.errors.has("mensagem")
            ? this.$validator.errors.first("mensagem")
            : "";
        }
      });
    },
  },
});
