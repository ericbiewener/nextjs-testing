import { useRef } from 'react'

const AbortControllerTest = () => {
  const init = useRef<RequestInit>({})

  const fetchIt = async () => {
    const controller = new AbortController()
    init.current.signal = controller.signal

    const timeout = setTimeout(() => {
      controller.abort()
    }, 30000)

    await fetch("//localhost:8080/abort-controller", init.current);

    if (timeout) clearTimeout(timeout)
  }

  const mutateInitAndAbort = () => {
    const controller = new AbortController()
    init.current.signal = controller.signal
    console.info('aborting!')
    controller.abort()
  }

  return (
    <>
      <h1>Abort Controller Test</h1>
      <button onClick={fetchIt}>Fetch it</button>
      <button onClick={mutateInitAndAbort}>Mutate init and abort</button>
    </>
  );
};

export default AbortControllerTest;
