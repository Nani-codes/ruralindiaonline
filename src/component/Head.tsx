import Header from "next/head";

export default function Head({title, description, keywords}: any) {
  return (
    <Header>
      <title>{title}</title>
      <meta
        name="keywords"
        content="rural india, archive, online archive, pari, p sainath, sainath, "
      ></meta>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
    </Header>
  );
}
