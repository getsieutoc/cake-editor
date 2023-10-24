import { Crystal } from '.';

type CrystalsTypes = {
  count: number;
  countChild: number;
  position: [number, number, number];
};
export function Crystals(props: CrystalsTypes) {
  const { count, countChild, position } = props;
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) =>
          Array(countChild)
            .fill(0)
            .map((__, i) => (
              <Crystal
                key={i}
                position={[
                  position[0] + index * 0.1 + i,
                  position[1],
                  position[2] - index - i * 0.1,
                ]}
                scale={[0.3 + i * 0.07, 0.3 + i * 0.07, 0.3 + i * 0.07]}
                rotation-x={1}
              />
            ))
        )}
    </>
  );
}
