import React, { useEffect, useState } from "react"
import { Button } from "@fider/components"
import { getCurrencyCode } from "@fider/services"

interface SubscribeButtonProps {
  onClick: () => void
}

const usePricing = (): string | undefined => {
  const prices: { [code: string]: string } = {
    USD: "$30",
    EUR: "€28",
    GBP: "£26",
  }

  const [price, setPrice] = useState<string>()
  useEffect(() => {
    getCurrencyCode().then((currencyCode) => setPrice(prices[currencyCode]))
  }, [])

  return price
}

export const SubscribeButton = (props: SubscribeButtonProps) => {
  const price = usePricing()

  if (!price) {
    return null
  }

  return (
    <p>
      <Button variant="primary" onClick={props.onClick}>
        Subscribe for {price}/mo
      </Button>

      <span className="block text-muted">Taxes may be added during checkout.</span>
    </p>
  )
}
