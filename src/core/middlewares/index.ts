import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

type MiddlewareCallback = (result: unknown) => void

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: MiddlewareCallback,
) => void

export const cors = Cors({ methods: ['GET', 'HEAD'] })

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: MiddlewareFunction) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
