async function verifyToken(slug: string){
  console.log(slug)
  const response = await fetch(`/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  });

  if (response.status === 200) {
    return 'Email verified successfully!';
  } else {
    return 'Email verification failed.';
  }
}

async function VerifyEmailPage({ params }: { params: { slug: string } }) {
 const result = verifyToken(params.slug)

  return <div>verify email {params.slug}</div>;
}
export default VerifyEmailPage;

