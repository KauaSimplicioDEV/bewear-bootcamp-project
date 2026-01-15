const Footer = () => {
  return (
    <footer className="bg-accent w-full mt-auto">
      <div className="container mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs md:text-sm font-medium">© 2025 Copyright BEWEAR</p>
          <p className="text-muted-foreground text-xs md:text-sm font-medium">
            Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
