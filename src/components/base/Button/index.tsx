import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames'

const OPEN_IN_NEW_TAB_PROPS = { target: '_blank', rel: 'noreferrer noopener' }
const OPEN_IN_CURRENT_TAB_PROPS = { target: '_self' }

interface TextButtonProps extends ButtonBaseProps {
  label: string
  textClassName?: string
}

interface TextLinkProps extends LinkBaseProps {
  label: string
  textClassName?: string
}

export const TextButton: FC<TextButtonProps | TextLinkProps> = (props) => {
  const containerStyle = 'TextButton group'
  const textStyle = 'decoration-inherit'
  const textClassName = props.textClassName

  if ('href' in props) {
    const { label, href, ariaLabel, className, onClick } = props

    return (
      <LinkBase href={href} className={cn(containerStyle, className)} ariaLabel={ariaLabel} onClick={onClick}>
        <span className={cn(textStyle, textClassName)}>{label}</span>
      </LinkBase>
    )
  }

  const { label, onClick, ariaLabel, role, className } = props

  return (
    <ButtonBase onClick={onClick} className={cn(containerStyle, className)} ariaLabel={ariaLabel} role={role}>
      <span className={cn(textStyle, textClassName)}>{label}</span>
    </ButtonBase>
  )
}

type ButtonBaseProps = {
  className?: string
  onClick?: () => void
  ariaLabel?: string
  role?: string
  type?: 'button' | 'submit' | 'reset'
}

export const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  className,
  onClick,
  children,
  ariaLabel,
  role,
  type = 'button',
}) => {
  return (
    <button onClick={onClick} className={className} aria-label={ariaLabel} role={role} type={type}>
      {children}
    </button>
  )
}

type LinkBaseProps = {
  className?: string
  href: string
  ariaLabel?: string
  onClick?: () => void
}

export const LinkBase: FC<PropsWithChildren<LinkBaseProps>> = ({ className, href, children, ariaLabel, onClick }) => {
  const isInternalLink = href.startsWith('/') || href.startsWith('#')
  const targetProps = isInternalLink ? OPEN_IN_CURRENT_TAB_PROPS : OPEN_IN_NEW_TAB_PROPS

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={onClick} {...targetProps}>
      {children}
    </a>
  )
}
