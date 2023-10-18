import React from 'react';

type DefaultProps = {
  children: React.ReactNode;
};

type CaseProps = DefaultProps & {
  condition: boolean;
};

function Switch({ children }: { children: React.ReactNode }) {
  let matchChild: React.ReactNode | null = null;
  let defaultCase: React.ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (!matchChild && React.isValidElement(child) && child.type === Case) {
      const caseElement = child as React.ReactElement<CaseProps>;
      const { condition } = caseElement.props;

      const conditionalResult = Boolean(condition);

      if (conditionalResult) matchChild = child;
    } else if (
      !defaultCase &&
      React.isValidElement(child) &&
      child.type === Default
    ) {
      defaultCase = child;
    }
  });

  return matchChild ?? defaultCase ?? null;
}

function Case({ children }: CaseProps): React.ReactNode {
  return children;
}

function Default({ children }: DefaultProps): React.ReactNode {
  return children;
}

export const ConditionalRendering = {
  Switch,
  Case,
  Default
}
